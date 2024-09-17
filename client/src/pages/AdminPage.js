import React from "react";
import { Link } from "react-router-dom";
import SecurityAdmin from './security/SecurityAdmin';

function AdminPage() {
  SecurityAdmin();
  return (
    <div className="">
      <div className="flex items-center justify-center flex-wrap gap-4 md:gap-6">
        <Link
          to="/d50d5447-c282-47a5-b39b-0be2e69538c9"
          className="text-white bg-sage-600 hover:bg-sage-700 py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400"
        >
          Add Question
        </Link>

        <Link
          to="/8668cd59-e17d-4525-9f51-619d7537f108"
          className="text-white bg-sage-600 hover:bg-sage-700 py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400"
        >
          Add Tim
        </Link>

        <Link
          to="/36a69f26-521f-45aa-aa6f-41c924825713"
          className="text-white bg-sage-600 hover:bg-sage-700 py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400"
        >
          Leaderboard
        </Link>

        <Link
          to="/895a9612-662f-41bf-a664-96d700b6c713"
          className="text-white bg-sage-600 hover:bg-sage-700 py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400"
        >
          Tim Join
        </Link>

        <Link
          to="/00fd0a7f-1af6-444a-a314-30c762d97752"
          className="text-white bg-sage-600 hover:bg-sage-700 py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400"
        >
          Tim List
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;
