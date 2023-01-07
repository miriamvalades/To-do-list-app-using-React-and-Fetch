import React, { useEffect, useState } from "react";

const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ todos, setTodos ] = useState([]);
	const [ count, setCount ] = useState(0);
	useEffect(() => {getList();}, []);

	const getList = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/miriamvalades")
		  .then((response) => response.json())
		  .then((result) => {
			console.log(result);
			setList(result);
		  })
		  .catch((error) => console.log(error));
	  };
	
	const addTask = (myTask) => {
		var newList = [...list, { label: myTask, done: false }];
		fetch("https://assets.breatheco.de/apis/fake/todos/user/miriamvalades", {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(newList),
		  redirect: "follow",
		})
		  .then((response) => {
			response.status === 200 ? setList(newList) : "";
		  })
		  .then((result) => getList())
		  .catch((error) => console.log(error));
	  };
	
	const deleteTask = async () => {  
        fetch("https://assets.breatheco.de/apis/fake/todos/user/miriamvalad", {
            method: "DELETE",
            headers: {"Content-type": "application/json"}
        })
        .then(response => {
            console.log(response)
            if (response.ok){
                response.json()
                addTask()
                setTodos([])       
            }
            new Error("Ocurrió un error eliminando User")
        }) 
        .then(json => console.log(json))
        .catch((error) => console.log(error));
    };

	return (
		<div className="container">
			<h1>my todos</h1>
			<ul>
				<li className="question">
					<input type="text" onChange={(e)=>setInputValue(e.target.value)} value={inputValue} onKeyPress={(e)=> {
					if (e.key === "Enter") {
						setTodos(todos.concat(inputValue));
						setInputValue("");}}}
				placeholder="What do you need to do?"></input></li>
				{todos.map((t, index) => (
					<li>{t}<i class="fa fa-times" onClick={() => setTodos(todos.filter((t, currentIndex) => index != currentIndex))}></i></li>
				))}
			</ul>
			<div className="todos-counter">
  				{todos.length === 1 ? `${todos.length} task` : `${todos.length} tasks`}
			</div>
			<button className='btn btn-danger mt-3 border-0' onClick={() => setTodos(todos.filter((t, currentIndex) => {return t = 0 }))}>Clear</button>
		</div>
	);
};

export default Home;