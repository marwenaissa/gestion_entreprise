import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="bg-gray-800 text-white h-full w-64 shadow-lg fixed pt-24"> {/* Use pt-16 for padding-top */}
            <ul className="space-y-4 w-full p-0">
                <li className="border border-black m-0">
                    <div className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 w-full">
                        <Link to="/dashboard" className="block text-center font-semibold hover:text-gray-300">
                            Tableau de Bord
                        </Link>
                    </div>
                </li>
                <li className="border border-black m-0">
                    <div className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 w-full">
                        <Link to="/employees" className="block text-center font-semibold hover:text-gray-300">
                            Employés
                        </Link>
                    </div>
                </li>
                <li className="border border-black m-0">
                    <div className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 w-full">
                        <Link to="/leave-tracking" className="block text-center font-semibold hover:text-gray-300">
                            Suivi des Congés
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
