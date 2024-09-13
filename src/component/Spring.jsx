import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Spring = () => {
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [name, setName] = useState('')

    function tryJoinPost(){
        const formData = new FormData();
        formData.append('email', id);
        formData.append('password', pw);
        formData.append('name', name);

        axios({ 
            url : "http://localhost:8092/api/member/join",
            method :"post",
            //body 에 data 담기
            //1. 데이터 보안
            //2. 데이터 용량의 제한이 없다
            data: formData  // formData로 해야 모델어튜리뷰트로 받을 수 있음
        })
        .then((res)=>{
            console.log(res)
        })
    }

    function tryLoginPost(){
        const formData = new FormData();
        formData.append('email', id);
        formData.append('password', pw);

        axios({ 
            url : "http://localhost:8092/api/member/login",
            method :"post",
            //body 에 data 담기
            //1. 데이터 보안
            //2. 데이터 용량의 제한이 없다
            data: formData
        })
        .then((res)=>{
            console.log(res)

            // JWT 토큰 저장
            sessionStorage.setItem('token', res.data);

            // JWT 토큰 읽기
            //const token = sessionStorage.getItem('token');

            // JWT 토큰 삭제
            //sessionStorage.removeItem('token');
        })
    }

    function getData(){
        const token = sessionStorage.getItem('token');

        axios({
            url : "http://localhost:8092/test",
            method :"get",
            headers: {
                'Content-Type': 'application/json', // 요청의 Content-Type
                Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 추가
            }
        })
        .then((res)=>{
            console.log(res)
        })
        .catch(error => {
            console.error('Request failed with status code', error.response.status);
        });
    }


  return (
    <div>
        <h1>React Spring 연결</h1>

        <h3>Login</h3>
        ID : <input onChange={(e)=>setId(e.target.value)}></input>
        <br></br>
        PW : <input onChange={(e)=>setPw(e.target.value)}></input>
        <br></br>


        <h3>Join</h3>
        ID : <input onChange={(e)=>setId(e.target.value)}></input>
        <br></br>
        PW : <input onChange={(e)=>setPw(e.target.value)}></input>
        <br></br>
        Name : <input onChange={(e)=>setName(e.target.value)}></input>
        <br></br>

        <button onClick={tryJoinPost}>회원가입</button>
        <br></br>
        <button onClick={tryLoginPost}>로그인</button>
        <br></br>
        <button onClick={getData}>데이터 가져오기</button>

    </div>
  )
}

export default Spring