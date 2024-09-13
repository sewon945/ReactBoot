import logo from './logo.svg';
import './App.css';
//라이브러리 설치후 사용 장소에서 반드시 import 작업부터 진행해야한다!
import axios from 'axios';
import {useState} from 'react'

function App() {

  const [data, setData] = useState([]);

  let myUrl = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=20120101'

  function getData(){
    axios({
        url :myUrl, // 서버의 주소
      })
      .then((res)=>{
        //res : 통신 성공시 서버에서 넘겨준 데이터
        alert("통신 성공!")
        console.log(res)
        setData(res.data.boxOfficeResult.dailyBoxOfficeList)

        console.log(res.data.boxOfficeResult.boxofficeType)
      }) // 통신 성공시 결과
  } 

  //axios 축약
  async function getData2(){
    //axios 축약 형식으로 사용할 경우 
    //통신결과가 return 되어진다 ---> Promise 타입 
    //Promise : 통신 상태 정보 (응답 데이터를 바로 사용할 수 없다)
    
    //Promise 사용2. async ~ await
    //             : 통신 상태중 통신이 완료 되었을때 응답 결과(데이터)를 가져오겠습니다
    const result = await axios.get(myUrl)
    console.log(result)
    
    //Promise 사용1.
    //  result.then((res)=>{
    //   console.log(res)
    //  })
  }

  return (
    <div className="App">
      <table border="1">
        <tr>
          <td>순위</td>
          <td>영화명</td>
          <td>개봉일</td>
        </tr>
        {/* map : 기존배열에 특정 규칙을 부여해서 새로운 배열생성1 */}
        {data.map((movie,index)=>
          <tr key={index}>
            <td>{movie.rank}</td>
            <td>{movie.movieNm}</td>
            <td>{movie.openDt}</td>
          </tr>
        )}
      
      </table>
      <button onClick={getData2}>데이터 가져오기</button>
    </div>
  );
}

export default App;
