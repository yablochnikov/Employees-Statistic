import "./app-info.css";

const AppInfo = ({ data, getEmployeesCounter }) => {
  const rise = data.filter(item => item.increase === true);
  return (
    <div className='app-info'>
      <h1>Учет сотрудников в компании Sensei inc.</h1>
      <h2>Общее число сотрудников: {getEmployeesCounter}</h2>
      <h2>Премию получат: {rise.length}</h2>
    </div>
  );
};

export default AppInfo;
