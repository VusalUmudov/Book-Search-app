import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
      background-image: url(https://dadabooksearch.netlify.app/images/headerbg.jpg);
    background-color: rgb(204, 204, 204);
    height: 350px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

  `

const SearchContainer = styled.div`
      width: 40%;
    display: block;
    position: relative;
    box-sizing: border-box;
  `


const Title = styled.h1`
  margin: 0px 0px 20px;
  display: block;
  color: white;
    text-align: center;
  `
const Inputdiv = styled.div`
  width: 100%;
    position: relative;
  `

const Input = styled.input`
width: 100%;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    font-family: Bitter, serif;
    box-shadow: rgb(255 255 255 / 85%) 0px 6px 12px -2px, rgb(255 255 255 / 90%) 0px 3px 7px -3px;
    transition: all 0.4s ease 0s;  `

const Svg = styled.svg`
  position: absolute;
    font-size: 20px;
    top: 14px;
    right: 8px;
    transition: all 0.2s ease 0s;
  `


const Img = styled.img`
    width: 95%;
    height: 220px;
    margin-left: auto;
    object-fit: contain;
    margin-right: auto;
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(220, 220, 220);
`

const Cardss = styled.div`
    width: 98%;
    margin: 20px auto auto;
    min-height: 55vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `

const Card = styled.div`
    width: 300px;
    margin: 20px;
    display: inline-block;
    text-align: center;
    background-color: white;
    padding: 15px 10px;
    border-radius: 5px;
    box-shadow: rgb(90 90 90 / 54%) 0px 3px 8px;
  `
const CardTitle = styled.h5`
    margin-top: 10px;
    font-size: 18px;
`
const Author = styled.h6`
    margin-top: 0px;
    margin-bottom: 15px;
    display: inline-block;
    border-top: 1px solid rgb(220, 220, 220);
    padding: 20px 5px 5px;
    font-size: 16px;
    opacity: 0.7;
`
const BtnDiv = styled.div`
    display: flex;
    justify-content: space-around;
`
const Button = styled.button` 
    border: 1px solid gray;
    background-color: transparent;
    width: 100px;
    font-size: 16px;
    padding: 10px;
    border-radius: 8px;
    transition: 0.5s all ease;
    &:hover{
        background-color: gray;
        color: aliceblue;
    }
`

const Preview = styled.a`
text-decoration: none;
color: black;
border: 1px solid gray;
    background-color: transparent;
    width: 100px;
    font-size: 16px;
    padding: 10px;
    border-radius: 8px;
    transition: 0.5s all ease;
    &:hover{
        background-color: gray;
        color: aliceblue;
    }
`


function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const inputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const [data, setData] = useState({ items: [] })

  const datas = () => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
      .then((res) => setData(res.data))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    datas();
  };

  return (
    <div className="App">
      <Form onSubmit={onSubmitHandler}>
        <SearchContainer>
          <Title>Search for books</Title>
          <Inputdiv>
            <Input
              type="text"
              placeholder="Search book..."
              value={searchTerm}
              onChange={inputChange}
            />

            <Svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="sc-dJjYzT kBkKjn" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></Svg>
          </Inputdiv>
        </SearchContainer>
      </Form>

      <Cardss>
        {data.items.map((book, index) => {
          return (
            <Card key={index}>

              <Img src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`} alt="foto" />
              <CardTitle>{book.volumeInfo.title}</CardTitle>
              <Author>{book.volumeInfo.authors}</Author>
              <BtnDiv>
                <Preview href={book.volumeInfo.infoLink}>Preview</Preview>
                <Button>Detail</Button>
              </BtnDiv>
            </Card>
          )
        })}
      </Cardss>

    </div>
  );
}

export default App;