import React from "react";
import './product.css'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating } from '@mui/material';
import { Col, Row } from "react-bootstrap";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';


export default function Product({searchResult}){

    return (
        <>
            {searchResult?.map((row) => {
                return <div>
                    <h3 className="row-title" >{row.title.split(' - ')[0]}</h3>
                    <Row style={{padding: '30px 0px 0px 0px'}}>
                        {row.products.map((product) => { 
                            return <Col md={3} style={{margin: '10px 0px'}} >
                                <Card style={{height: 300}}>
                                    <CardActionArea onClick={() => {
                                        window.open(product.url, '_blank');
                                    }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            style={{ objectFit: 'contain', width: '100%' }}
                                            image={product.company_image}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {product.company}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <b>Price:</b> Rs. {product.price}
                                        </Typography>
                                        <Rating
                                            name="custom-rating"
                                            precision={0.01}
                                            value={product.rating}
                                            max={5}
                                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                            icon={<StarIcon fontSize="inherit" />}
                                            readOnly
                                        /> {product.rating} 
                                            <span className="review-count">
                                                {'('+product.total_review_count+')'}
                                            </span>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Col>
                        })}
                    </Row>
                    <hr />
                </div>
            })}
        </>
        
    )
}
