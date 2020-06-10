import React, {useRef} from 'react'
import classes from './Profile.module.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const Profile = (props) => {
    let courses = null;

    if (props.progression) {
        courses = <React.Fragment>
            <div className={classes.userDataBox}>
                Cours suivis : <span>{props.progression.length}</span>
            </div>

            {props.progression.map(prog => (
                <div key={prog.id} className={classes.courseFollowed}>
                    <div className={classes.courseFollowedImg} style={{backgroundImage: "url('" + prog.image + "')"}}></div>
                    <div className={classes.courseFollowedData}>
                        {prog.name}
                        {prog.user_id === props.user.id ? <NavLink to="/course/add">Edit</NavLink> : null}
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

        axios.post('http://localhost:8000/api/auth/user/'+ props.user.id +'/profile-photo', image, config)
        .then (response => {
            console.log(response.data);
            document.getElementById('userImage').style.backgroundImage = "url('" + response.data.image + "')";
            axios.post('http://localhost:8000/api/auth/me')
            .then(response => {
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
                <div id="userImage" onClick={() => handleClick()} className={classes.userImage} style={{backgroundImage:props.user.image ? "url('http://localhost:8000/storage/images/" + props.user.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                
                <input style={{display:'none'}} id="uploadFile" type="file" name="image" ref={fileInput} onChange={(event) => {handleFileChange(event)}}/>
                <div className={classes.userInfosText}>
                    {props.user.name}<br/>
                    <button>Edit Profile</button>
                </div>
            </div>

            <div className={classes.userData}>
                {props.user.role === 'Professor' ? <NavLink to="/course/add">Ajouter Un cours</NavLink> : null}
                <div className={classes.userDataBox}>
                    Type de Compte : <span>Premium</span>
                </div>

                <div className={classes.userDataBox}>
                    Status : <span> {props.user.role}</span>
                </div>
                
                {courses}
            </div>
        </div>
    )
}

export default Profile;