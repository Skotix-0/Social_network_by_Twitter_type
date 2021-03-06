import React, {useState, useRef} from 'react';
import styles from './Profile.module.scss';
import Post from '../../conponents/Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import {addPostReducer} from '../../Redux/reducers/reducerPost';

export default function Profile(props:any) {
    const dispatch = useDispatch();
    const postsData = useSelector( (state:any) => state.posts.postsData);
    const User_name = useSelector((state:any) => state.authorize.user_name);
    const User_surname = useSelector((state:any) => state.authorize.user_surname);
    const User_FIO = User_name + ' ' +User_surname;

    const [newTweet, SetNewTweet] = useState({});

    const textArea_newPost:any = useRef('');

    const ADD_POST = () =>{
        if(textArea_newPost.current.value.trim() !== ''){
            dispatch(addPostReducer(newTweet));
            textArea_newPost.current.value = '';
        }else{
            textArea_newPost.current.value = '';
        }
    }

    return (
        <div className={styles.Profile}>
            <div className={styles.tweet_textarea}>
                <textarea ref={textArea_newPost} value={textArea_newPost.current.value} name="" id="" onChange={ 
                    (elem:any) => {
                        SetNewTweet({ name: User_FIO, text_post: elem.target.value});
                    } 
                } placeholder='Что нового ?'></textarea>

                <button onClick={ ADD_POST }>Tweet</button>
            </div>
            
            <Post postsData={postsData}/>
        </div>
    );
}
