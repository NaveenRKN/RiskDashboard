import axios from 'axios';

const fetchUser = async (user) => {
return new Promise((resolve, reject) => {
   axios
   .get(`https://api.github.com/users/${user}`)
   .then((response) => {
       resolve(response);
   })
   .catch((error) => {
       reject(error);
   });
});
};

export {fetchUser};