import { Box, Card, CardHeader, Icon, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import CreateIngredientCategoryForm from './CreateIngredientCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientCategory } from '../../component/State/Ingredients/Action';



const IngredientCategoryTable = () => {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, ingredient } = useSelector(store => store);


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getIngredientCategory({ jwt, id: restaurant?.usersRestaurant?.id }));
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title={"Ingredient Category"}
                    sx={{ pt: 2, alignItems: "center" }}
                    action={
                        <IconButton onClick={handleOpen}>
                            <CreateIcon/>
                        </IconButton>

                    }
                />

            </Card>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell align="left">Image</TableCell>
                            <TableCell align="left">Title</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ingredient?.category?.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.id}
                                </TableCell>
                                <TableCell align="left">{item.name}</TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateIngredientCategoryForm handleClose={handleClose}/>
                </Box>
            </Modal>
        </Box>
    )
}

export default IngredientCategoryTable