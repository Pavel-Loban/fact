import React, { useState } from 'react'
import axios from 'axios'

const UserInfo = () => {
  const urlAge = `https://api.agify.io/?name=`
  const urlGender = `https://api.genderize.io/?name=`
  const urlNationalize = `https://api.nationalize.io/?name=`

  const [nameValue, setNameValue] = useState('')
  const [gender, setGender] = useState('')
  const [national, setNational] = useState('')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const userNameValue = (e) => {
    setSearch(e.target.value)
    // console.log(search);
  }

  // const getInfoName = async () => {
  //   if(search){
  //   const data = await  axios.get(`${urlAge}${search}`)

  //       return  data.data;

  //     // })
  //     // .catch((err) => {
  //     //   console.log(err.message);
  //     // })
  //   }
  // }

  // const getGender = new Promise((resolve, rej) => {
  //   if(search){
  //   fetch(`${urlGender}${search}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       resolve(data)
  //     })
  //     .catch((error) => {
  //       setError(error)
  //     })
  //   }
  // })


  // =====================

  const getResourse = async (url) => {

    try {
      const res = await axios.get(url);
      return await res.data;
    } catch (err) {
      console.log(err);
      throw new Error(`!!!!!!!!! ${err}`);
    }
  };

  const getUserNameAge = async () => {
    if(search){
      const data = await getResourse(`${urlAge}${search}`);
    return data;
    }
  };

  const getGender = async () => {
    if(search){
      const data = await getResourse(`${urlGender}${search}`);
      return data;
    }
  }

  const getNational = async () => {
    const data = await getResourse(`${urlNationalize}${search}`);
    return data;
  }

  // const getNational = new Promise((resolve, rej) => {
  //   if(search){
  //   fetch(`${urlNationalize}${search}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       resolve(data)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //   }
  // })

  const allPromise = () => {
    Promise.all([getUserNameAge(), getGender(), getNational()]).then((value) => {
      setNameValue(value[0]);
      setGender(value[1]);
      setNational(value[2].country[0])
    })
    setSearch('');
  }



  return (
    <div>
      <div>
        <p>Information by name</p>
        <input
          type={'text'}
          value={search}
          placeholder={'search'}
          onChange={userNameValue}
        ></input>
        <button onClick={allPromise}>Search</button>
      </div>

      <div>Name: {nameValue.name} </div>
      <div>Age: {nameValue.age}  </div>
      <div>Gender: {gender.gender}</div>
      <div>Nationalize: {national.country_id} </div>
    </div>
  )
}

export default UserInfo
