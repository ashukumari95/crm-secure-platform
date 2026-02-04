import { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Layout from '../components/Layout';
import { FaFire, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProjectBoard = () => {
  const [columns, setColumns] = useState({
    Pending: [],
    Running: [],
    Completed: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Fetch and Sort Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/projects`, {
           headers: { Authorization: `Bearer ${token}` }
        });

        // Group by Status
        const newColumns = { Pending: [], Running: [], Completed: [] };
        res.data.forEach(p => {
            // Default to Pending if status doesn't match
            if(newColumns[p.status]) {
                newColumns[p.status].push(p);
            } else {
                newColumns['Pending'].push(p);
            }
        });

        setColumns(newColumns);
      } catch (err) {
        console.error("Board Error", err);
        toast.error("Failed to load board");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // 2. Handle Drag End
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // If dropped in same place, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // A. Optimistic Update (Update UI instantly)
    const startCol = columns[source.droppableId];
    const endCol = columns[destination.droppableId];
    const [movedProject] = startCol.splice(source.index, 1);
    
    // Update local object status
    movedProject.status = destination.droppableId;
    endCol.splice(destination.index, 0, movedProject);

    setColumns({ ...columns });

    // B. Send API Request (Background)
    try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        await axios.put(`${apiUrl}/projects/${draggableId}`, 
            { status: destination.droppableId }, 
            { headers: { Authorization: `Bearer ${token}` }}
        );
        toast.success(`Moved to ${destination.droppableId}`);
        // Clear Dashboard Cache so stats update
        sessionStorage.removeItem('projectsData'); 
    } catch (err) {
        toast.error("Failed to save move");
        // Revert UI if API fails (Optional, but good practice)
        window.location.reload(); 
    }
  };

  // Helper: Get Color based on Priority
  const getPriorityColor = (p) => {
    if(p === 'High' || p === 'Critical') return 'bg-red-100 text-red-700 border-red-200';
    if(p === 'Medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  if(loading) return <div className="flex h-screen items-center justify-center font-bold text-blue-900">Loading Board...</div>;

  return (
    <Layout title="Project Kanban Board">
      <div className="p-4 h-full overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-6 min-w-[1000px]">
                
                {/* --- COLUMN: PENDING --- */}
                <Column 
                    id="Pending" 
                    projects={columns.Pending} 
                    icon={<FaClock className="text-yellow-500" />} 
                    title="Backlog / Pending"
                    navigate={navigate}
                    getPriorityColor={getPriorityColor}
                />

                {/* --- COLUMN: RUNNING --- */}
                <Column 
                    id="Running" 
                    projects={columns.Running} 
                    icon={<FaFire className="text-blue-500 animate-pulse" />} 
                    title="In Progress"
                    navigate={navigate}
                    getPriorityColor={getPriorityColor}
                />

                {/* --- COLUMN: COMPLETED --- */}
                <Column 
                    id="Completed" 
                    projects={columns.Completed} 
                    icon={<FaCheckCircle className="text-green-500" />} 
                    title="Done / Delivered"
                    navigate={navigate}
                    getPriorityColor={getPriorityColor}
                />

            </div>
        </DragDropContext>
      </div>
    </Layout>
  );
};

// Sub-Component for Cleanliness
const Column = ({ id, projects, icon, title, navigate, getPriorityColor }) => {
    return (
        <div className="flex-1 bg-gray-100 rounded-xl p-4 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-bold text-gray-700 flex items-center gap-2 uppercase text-sm tracking-wider">
                    {icon} {title}
                </h3>
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-bold">{projects.length}</span>
            </div>

            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 space-y-3 transition-colors rounded-lg p-2 ${snapshot.isDraggingOver ? 'bg-blue-50 ring-2 ring-blue-200' : ''}`}
                    >
                        {projects.map((project, index) => (
                            <Draggable key={project._id} draggableId={project._id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => navigate(`/projects/${project._id}`)}
                                        className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group
                                            ${snapshot.isDragging ? 'shadow-2xl rotate-2 scale-105 border-blue-500 z-50' : ''}`}
                                        style={{ ...provided.draggableProps.style }}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityColor(project.priority)}`}>
                                                {project.priority}
                                            </span>
                                            {project.deadline && (
                                                <span className="text-[10px] text-gray-400 font-mono">
                                                    {new Date(project.deadline).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-blue-600 truncate">{project.name}</h4>
                                        <p className="text-xs text-gray-500 truncate mb-3">{project.client}</p>

                                        <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-1">
                                            <div className="flex items-center gap-2">
                                                 <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200">
                                                    {project.assignedTo?.name?.charAt(0) || '?'}
                                                 </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400">₹{Number(project.budget).toLocaleString()}</span>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ProjectBoard;