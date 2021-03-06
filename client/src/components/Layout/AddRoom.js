import React from 'react'
import {
     Card,
     CardContent,
     withStyles,  
     Typography, 
     CssBaseline,
     FormControl, 
     Input,
     Select,
     MenuItem,
     FilledInput,
     InputLabel,
     CardActionArea,
     Button, 
    } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import API from '../Lists/api';

const styles = (theme) => ({
    card: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 5,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]:{
            width: 400,
            marginLeft:'auto',
            marginRight: 'auto'
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        marginTop: theme.spacing.unit * 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form:{
        width:'100%',
        marginTop:theme.spacing.unit * 3,
    },
    submit:{
        marginTop:theme.spacing.unit * 3
    },
    margin: {
        marginTop:theme.spacing.unit,
        marginLeft: theme.spacing.unit * 20,
        //marginRight: theme.spacing.unit * 3,
        marginButton: theme.spacing.unit * 10,
    }
})

class AddRoom extends React.Component {

    state = { 
        name: '',
        status: true,
        rooms: [],
     }

     handleInput = (e) => {
        this.setState({ name: e.target.value })
     }

     handleStatus =(e) => {
        this.setState({ status: e.target.value })
         console.log(this.state.name)
         console.log(this.state.status)
         e.preventDefault();
     }

     onSubmit = (e) => {
        e.preventDefault();

            // Take all the data in the form
             let name = this.state.name
             let status = this.state.status

             console.log(name)
             console.log(status)
        // Use Axios to post to the server and retrieve the data
         API.post(`/admin/add/room`, { 'room': name, 'status': status}).then( res => {
            this.setState({ rooms:res.data })
            //console.log(this.state.users)
            this.props.history.push('/adminHomepage')
         }) 
     }

    render() { 
        const { classes } = this.props
        return ( 
            <Card className={classes.card}>
            <CssBaseline />
            <Typography component="h1" variant="h5">
                Add Room  
            </Typography> 
            <form className={classes.form}>
                <CardContent>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="name"> Add Room name </InputLabel>
                        <Input name="name" autoComplete="name" onKeyUp={this.handleInput}/>
                    </FormControl>
                    <FormControl variant="filled">
                        <InputLabel htmlFor="filled-status-simple">Status</InputLabel>
                        <Select
                            value={this.state.status}
                            onChange={this.handleStatus}
                            input={<FilledInput name="status" id="filled-status-simple" />}
                        >
                            <MenuItem value={true}>Active</MenuItem>
                            <MenuItem value={false}>Deactivate</MenuItem>
                        </Select>
                    </FormControl>  
                </CardContent>
                <CardActionArea>
                    <Button onClick={this.onSubmit} variant="contained" color="secondary" className={classes.margin}> Submit </Button>
                </CardActionArea>
            </form>
        </Card>

         );
    }
}

AddRoom.propTypes = {
    classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(AddRoom);