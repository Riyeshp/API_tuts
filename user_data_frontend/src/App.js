import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    mobile: ''
  });
  const [users, setUsers] = useState([]);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [numberOfDetails, setNumberOfDetails] = useState(4);
  const [prevNumberOfDetails, setPrevNumberOfDetails] = useState(null);

  // useEffect(() => {
  //   fetchUsers();  
  // }, []);

//   axios({method: "get",
//   url: "http://127.0.0.1:5000/users",
//   params: {
//     _limit :5,
//   },
// })

  const fetchUsers = () => {
    console.log("test");
    setFetchingUsers(true);
    axios.get(`http://127.0.0.1:5000/users?limit=${numberOfDetails}`)
      .then(response => {
        setUsers(response.data);
        console.log(response.data)
        setFetchingUsers(false);
      })
      .catch(error => {
        console.error(error);
        setFetchingUsers(false);
      });
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://127.0.0.1:5000/users', formData)
      .then(response => {
        console.log(response.data);
        // Handle success response
        fetchUsers();
        setFormData({
          name: '',
          email: '',
          city: '',
          mobile: ''
        });
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  };

  const handleFetchUserDetails = () => {
    if (numberOfDetails !== prevNumberOfDetails) {
      fetchUsers();
    }
    setPrevNumberOfDetails(numberOfDetails);
    setShowUserDetails(true);
  };

  const handleNumberOfDetailsChange = (event) => {
        setNumberOfDetails(parseInt(event.target.value));
        console.log(numberOfDetails);
  };

  return (
    <div className="container">
      <h1>User Details</h1>
      <form onSubmit={handleSubmit} class="col-6">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Mobile</label>
          <input
            type="tel"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
 
      <div>
      <div className="mt-4">
        <h2>Users</h2>
        <div className="mb-3" class="col-3">
          <label htmlFor="numberOfDetails" className="form-label">Number of User Details to Fetch</label>
          <input type="number" className="form-control" id="numberOfDetails" name="numberOfDetails" value={numberOfDetails} onChange={handleNumberOfDetailsChange} />
        </div>
        <button className="btn btn-primary" onClick={handleFetchUserDetails} disabled={fetchingUsers}>
          {fetchingUsers ? 'Fetching Users...' : 'Fetch User Details'}
        </button>
        {showUserDetails && (
          <div>
            {users.length > 0 ? (
              <ul>
                {users.map(user => (
                  <li key={user.id}>
                    <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}, <strong>City:</strong> {user.city}, <strong>Mobile:</strong> {user.mobile}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        )}
      </div>
    </div>

      
    </div>

   
    
  );
}

export default App;
