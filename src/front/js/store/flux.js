const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
		isLogin:false,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      user: [],
    },
    actions: {
      getPrivate: (token) => {
        fetch(
          "https://3001-4geeksacade-reactflaskh-357abplvep3.ws-us79.gitpod.io/api/private",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then(response=>response.json()).then(result=>setStore({isLogin:true})) .catch(error=>{
			
			localStorage.clear()
		})
      },
	  setLogin:(statuslogin)=>{
		console.log(statuslogin)
		setStore({isLogin:statuslogin})
	  },
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
