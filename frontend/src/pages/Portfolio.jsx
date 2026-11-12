import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Printer, FileCheck, CheckCircle } from 'lucide-react';

export default function Portfolio() {
  const { user } = useAuth();
  const userId = user?.id || user?._id;
  const [projects, setProjects] = useState([]), [portfolio, setPortfolio] = useState(null), [projectId, setProjectId] = useState(''), [loading, setLoading] = useState(true), [error, setError] = useState('');
  const loadProjects = useCallback(async () => {
    setLoading(true); setError('');
    try { const response = await api.get('/projects'); const items = Array.isArray(response.data.data.projects) ? response.data.data.projects : []; setProjects(items); setProjectId(current => current || items[0]?._id || ''); if (!items.length) setLoading(false); }
    catch { setError('Your projects could not be loaded. Please try again.'); setLoading(false); }
  }, []);
  const loadPortfolio = useCallback(async () => {
    if (!projectId || !userId) return;
    setLoading(true); setError('');
    try { const response = await api.get(`/portfolio/${userId}/${projectId}`); setPortfolio(response.data.data); }
    catch { setError('Your portfolio could not be loaded. Please try again.'); }
    finally { setLoading(false); }
  }, [projectId, userId]);
  useEffect(() => { loadProjects(); }, [loadProjects]);
  useEffect(() => { loadPortfolio(); }, [loadPortfolio]);
  if (loading) return <div className="page-state"><h2>Loading your evidence-backed portfolio…</h2></div>;
  if (error) return <div className="page-state error-state"><h2>Portfolio unavailable</h2><p>{error}</p><button className="btn" onClick={projectId ? loadPortfolio : loadProjects}>Try again</button></div>;
  if (!portfolio) return <div className="page-state"><h2>No portfolio data yet</h2><p>Create a project and document contributions to generate one.</p></div>;
  return <div className="page portfolio"><div className="title-row no-print"><div><span className="eyebrow">INDIVIDUAL PORTFOLIO</span><h1>Your contribution story</h1><p>Generated from verified project records—not claims.</p></div><button className="btn" onClick={() => window.print()}><Printer size={17}/> Print / Save PDF</button></div><select className="portfolio-select no-print" value={projectId} onChange={event => { setPortfolio(null); setProjectId(event.target.value); }}>{projects.map(project => <option key={project._id} value={project._id}>{project.title}</option>)}</select><section className="portfolio-sheet"><div className="portfolio-cover"><span>CONTRIBUTION PORTFOLIO</span><h1>{portfolio.student?.fullName}</h1><p>{portfolio.member?.role} · {portfolio.student?.department}</p><div>{portfolio.project.title}</div></div><div className="portfolio-body"><h2>Contribution summary</h2><p className="summary">{portfolio.summary}</p><div className="portfolio-stats">{Object.entries(portfolio.stats || {}).map(([key, value]) => <div key={key}><strong>{value}</strong><span>{key}</span></div>)}</div><h2>Project objectives</h2><ul>{portfolio.project.goals?.map(goal => <li key={goal}>{goal}</li>)}</ul><h2>Documented contributions</h2>{portfolio.contributions?.map(contribution => <div className="portfolio-item" key={contribution._id}><FileCheck/><div><b>{contribution.title}</b><p>{contribution.description}</p><small>{contribution.category} · {contribution.verificationStatus}</small></div></div>)}<h2>Completed tasks</h2><ul>{portfolio.tasks?.filter(task => task.status === 'Completed').map(task => <li key={task._id}><CheckCircle size={15}/>{task.title}</li>)}</ul></div></section></div>;
}
