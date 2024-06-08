import * as React from 'react';
import SearchField from './SearchBox';
import './search.css';
import axios from 'axios';
import Product from './Products';
import { Container } from 'react-bootstrap';
import Loader from './Loader';

export default function Main(){

    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState();

    const handleSearch = async (search, companies, sort="") => {
        try {
            setLoading(true);
            const response = await 
            axios.get('http://127.0.0.1:8000/api/products/?search='+search+'&sort='+sort+"&company="+companies.join(','),
              {
                  withCredentials: true,
                  headers: { 'Content-Type': 'multipart/form-data' },
                  credentials: true,
              }
            );
            setTimeout(() => {
                setData(response.data);
                setLoading(false);    
            }, 1500);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
    }
    return (
        <div className={data?.count>0 ? 'header' : 'header'} style={{display: data?.count>0 ? '' : 'flex', marginTop: data?.count>0?'20px':''}} >
            <SearchField handleSearch={handleSearch} showSort={data?.count>0} />

            {/* <Loader /> */}
            <Container>
                {loading
                ? <Loader /> 
                : <Product searchResult={data?.results} />}
            </Container>
        </div>
    )
}
