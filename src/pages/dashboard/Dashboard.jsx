import { useEffect, useState } from 'react';
import { getRoutines } from '../../services/routinesService';

export default function Dashboard() {
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        const load = async () => {
            setRoutines(await getRoutines());
        };
        load();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {routines.map((r) => (
                <p key={r.id}>{r.name}</p>
            ))}
        </div>
    );
}
