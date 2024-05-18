import { Accordion, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react'
import { categorizeIngrdients } from '../../utils/categrizeingredinets';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';

const MenuCard = ({ item }) => {

    const [selectedIngrdients, setSelectedIngredinets] = useState([]);

    const dispatch = useDispatch();
    const handleAddItemToCart = (e) => {
        e.preventDefault(); 
        const reqData = {
            token: localStorage.getItem("jwt"),
            cartItem: {
                foodId: item.id,
                quantity: 1,
                ingredients: selectedIngrdients
            }
        };
        console.log(reqData);
        dispatch(addItemToCart(reqData));

    }


    const handleCheckBoxChange = (itemName) => {

        if (selectedIngrdients.includes(itemName)) {

            setSelectedIngredinets(selectedIngrdients.filter(item => item !== itemName));
        } else {
            setSelectedIngredinets([...selectedIngrdients, itemName]);
        }
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className='lg:flex items-center justify-between lg:gap-5'>
                        <div className='lg:flex items-center ' >
                            <img className='w-[7rem] h-[7rem] object-cover' src={item.images[0]} alt="" />
                        </div>
                        <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                            <p className='font-semibold text-xl'>{item.name}</p>
                            <p >{item.price} LKR</p>
                            <p className='text-gray-400'>{item.description}</p>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>

                    <form onSubmit={handleAddItemToCart}>

                        <div className='flex gap-5 flex-wrap'>
                            {
                                Object.keys(categorizeIngrdients(item.ingredients)).map(category =>
                                    <div>
                                        <p>{category}</p>
                                        <FormGroup>

                                            {
                                                categorizeIngrdients(item.ingredients)[category].map(item =>
                                                    <FormControlLabel key={item.id} control={<Checkbox onChange={() => handleCheckBoxChange(item.name)} />} label={item.name} />
                                                )
                                            }

                                        </FormGroup>
                                    </div>

                                )
                            }
                        </div>

                        <div className='pt-5'>
                            <Button type="submit" variant='contained' disabled={false}>{true ? ("Add to Cart") : ("Out of Stock")}</Button>
                        </div>
                    </form>
                </AccordionDetails>
            </Accordion>

        </div>
    )
}

export default MenuCard