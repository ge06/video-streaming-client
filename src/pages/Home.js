import axios from "axios";

const Home = () => {

    const getContents = async () => {
        const res = await axios.get('http://localhost:4000/contents')
        console.log(res.data)
    }


    return (<div>
        Home Page
        <button onClick={() => getContents()}> getContents</button>

    </div>);
}

export default Home;