const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

// @desc    Get projects (Admin sees all, Employee sees assigned)
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  let projects;
  if (req.user.role === 'admin') {
    projects = await Project.find().populate('assignedTo', 'name email jobTitle');
  } else {
    projects = await Project.find({ assignedTo: req.user.id });
  }
  res.status(200).json(projects);
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('assignedTo', 'name email');
  
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // 🔒 SECURITY: Ensure employee can only view their own project
  if (req.user.role !== 'admin' && project.assignedTo?._id.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Not authorized to view this project');
  }

  res.json(project);
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
  // 🔒 SECURITY: Strictly enforce Admin Only
  if (req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Access Denied: Only Admins can launch projects');
  }

  const { 
    name, client, clientEmail, status, budget, deadline, 
    assignedTo, priority, techStack, projectType, docsLink, description 
  } = req.body;

  if (!name || !client || !budget || !deadline) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const project = await Project.create({
    name, client, clientEmail, description,
    status: status || 'Pending',
    budget, deadline,
    assignedTo: assignedTo || null,
    priority: priority || 'Medium',      
    techStack: techStack || '',          
    projectType: projectType || 'Other', 
    docsLink: docsLink || '',            
    user: req.user.id,
  });

  res.status(201).json(project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // 🔒 SECURITY: Authorization Check
  const isAdmin = req.user.role === 'admin';
  const isAssigned = project.assignedTo?.toString() === req.user.id;

  if (!isAdmin && !isAssigned) {
     res.status(403);
     throw new Error('Not authorized to update this project');
  }

  let updatedData = req.body;

  // 🔒 SECURITY: Restrict what Employees can change
  if (!isAdmin) {
      // Employees can ONLY update status, docsLink, and description
      // They CANNOT change budget, deadline, client, or assign it to someone else
      updatedData = {
          status: req.body.status,
          docsLink: req.body.docsLink,
          description: req.body.description,
          techStack: req.body.techStack
      };
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    updatedData, 
    { new: true }
  );

  res.json(updatedProject);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // 🔒 SECURITY: Only Admin can delete
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Access Denied: Only Admins can delete projects');
  }

  await project.deleteOne();
  res.json({ id: req.params.id });
});

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};