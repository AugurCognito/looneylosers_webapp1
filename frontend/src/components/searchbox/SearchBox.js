import React, {useState} from 'react'
import { ArrowButton } from '../Icons'


const [searchValue, searchResults] = useState([]);


function searchFunc(){
	fetch("127.0.0.1:8000/api/v1/notes/?search="+query,{
		method : "GET",
		
		})

	}
