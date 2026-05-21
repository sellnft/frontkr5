import { add } from '../utils/math';


function Home() {

  const res = add(2, 3);
  return (
    <div>
      <h1>Главная страница</h1>
      <p>Это основной маршрут, который загружается сразу</p>
    </div>
  );
}
export default Home;