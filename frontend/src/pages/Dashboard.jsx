import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';
import { FolderKanban, CheckSquare, ShieldCheck, Clock, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';

const stats = [['projects', 'Total Projects', FolderKanban], ['assigned', 'Tasks Assigned', CheckSquare], ['completed', 'Tasks Completed', ShieldCheck], ['verified', 'Verified Work', ShieldCheck], ['pending', 'Pending Reviews', Clock]];
export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setError('');
    try { const response = await api.get('/dashboard/stats'); setData(response.data.data); }
    catch { setError('The dashboard could not reach the server. Please try again.'); }
  }, []);
  useEffect(() => { load(); }, [load]);
  if (!data) return <div className="page-state"><h2>{error ? 'Dashboard unavailable' : 'Loading your workspace…'}</h2>{error && <><p>{error}</p><button className="btn" onClick={load}>Try again</button></>}</div>;
  const chart = Array.isArray(data.chart) ? data.chart : [];
  const distribution = Array.isArray(data.distribution) ? data.distribution : [];
  return <div className="page"><div className="title-row"><div><span className="eyebrow">OVERVIEW</span><h1>Dashboard</h1><p>Here’s a snapshot of your documented impact.</p></div><Link className="btn" to="/projects"><Plus size={17}/> Create project</Link></div><div className="stats">{stats.map(([key, label, Icon]) => <div className="stat" key={key}><div className="icon"><Icon size={19}/></div><span>{label}</span><strong>{data.stats?.[key] ?? 0}</strong></div>)}</div><div className="charts"><section><h3>Contribution activity</h3><p>Documented work this week</p><ResponsiveContainer width="100%" height={230}><LineChart data={chart}><XAxis dataKey="day"/><YAxis/><Tooltip/><Line type="monotone" dataKey="count" stroke="#635bff" strokeWidth={3}/></LineChart></ResponsiveContainer></section><section><h3>Project distribution</h3><p>Contributions across your work</p><ResponsiveContainer width="100%" height={230}><BarChart data={distribution}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="count" fill="#9b8afb" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></section></div><section className="recent"><h3>Recent activity</h3><div className="empty">Activity is recorded as your team creates tasks, contributions, and reviews.</div></section></div>;
}
