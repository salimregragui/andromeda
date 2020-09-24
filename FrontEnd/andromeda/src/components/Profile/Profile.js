import React, {useRef} from 'react'
import classes from './Profile.module.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import * as timeago from 'timeago.js';

const Profile = (props) => {
    let courses = null;

    if (props.progression) {
        courses = <React.Fragment>
            <div className={classes.userDataBox} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
                Cours suivis : <span>{props.progression.length}</span>
            </div>

            {props.progression.map(prog => (
                <div key={prog.id} className={classes.courseFollowed} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
                    <div className={classes.courseFollowedImg} style={{backgroundImage: "url('" + prog.image + "')"}}></div>
                    <div className={classes.courseFollowedData}>
                        {prog.name}
                        {prog.user_id === props.user.id ? <NavLink style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', border: '2px solid white', color:'white'} : null} to="/course/add">Edit</NavLink> : null}
                    </div>
                </div>
            ))}
        </React.Fragment>
    }

    const fileInput = useRef(null)

    const handleClick = () => {
        fileInput.current.click()
    }

    const handleFileChange = event => {
        let image = new FormData();
        image.append('image', document.getElementById('uploadFile').files[0]);

        const config = {
            headers:{'Content-Type' : 'multipart/form-data'}
        };

        axios.post('https://limitless-wildwood-57587.herokuapp.com/api/auth/user/'+ props.user.id +'/profile-photo', image, config)
        .then (response => {
            console.log(response.data);
            document.getElementById('userImage').style.backgroundImage = "url('" + response.data.image + "')";
            axios.post('https://limitless-wildwood-57587.herokuapp.com/api/auth/me')
            .then(response => {
                props.onImageChangedNotification();
                props.onImageChange(localStorage.getItem('token'), response.data);
            })
            .catch(error => {
                localStorage.removeItem('token');
                this.props.history.push({
                pathname: '/error',
                state: {
                    error: error
                }
                });
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div className={classes.Profile}>
            <div className={classes.userInfos}>
                <div id="userImage" onClick={() => handleClick()} className={classes.userImage} style={{backgroundImage:props.user.image ? "url('https://limitless-wildwood-57587.herokuapp.com/storage/images/" + props.user.image + "')" : "url('https://andromeda-learning.netlify.com/profile-placeholder.jpg')"}}></div>
                
                <input style={{display:'none'}} id="uploadFile" type="file" name="image" ref={fileInput} onChange={(event) => {handleFileChange(event)}}/>
                <div className={classes.userInfosText} style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>
                    <em>Cliquer sur votre photo pour l'éditer.</em><br/><br/>
                    {props.user.name}<br/>
                    <span>Compte crée : {timeago.format(props.user.created_at)}</span>
                    <button>Edit Profile</button>
                </div>
            </div>

            <div className={classes.userData}>
                {props.user.role === 'Professor' || props.user.role === 'Admin' ? <NavLink to="/course/add">Ajouter Un cours</NavLink> : null}
                <div className={classes.userDataBox} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
                    Type de Compte : <span>Premium</span>
                </div>

                <div className={classes.userDataBox} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
                    Status : <span> {props.user.role}</span>
                </div>
                
                {courses}
            </div>
        </div>
    )
}

export default Profile;