import EditTranslationPairs from "../components/EditTranslationPairs";

const Dashboard = () => {
  return (
    <>
      <div className="center">
        <h1>Dashboard</h1>
      </div>
      <div className="center">
        <h2>Edit and add new words</h2>
        <EditTranslationPairs />
      </div>
    </>
  );
};

export default Dashboard;
