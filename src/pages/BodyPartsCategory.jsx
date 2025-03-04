import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Categories.css';

const BodyPartsCategory = () => {
    const { id } = useParams(); // Get body part from URL
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        if (id) {
            fetchData(id.toLowerCase()); // Ensure lowercase for API call
        }
    }, [id]); // Run when 'id' changes

    const fetchData = async (bodyPart) => {
        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
            params: { limit: '200' },
            headers: {
                'X-RapidAPI-Key': 'e2ab56a45amsh8a75b951d02fb60p125f09jsn4de8664033bc',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setExercises(response.data);
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    };

    return (
        <div className='category-exercises-page'>
            <h1>Category: <span>{id}</span></h1>

            {exercises.length > 0 ? (
                <div className="exercises">
                    {exercises.map((exercise, index) => (
                        <div className="exercise" key={index} onClick={() => navigate(`/exercise/${exercise.id}`)}>
                            <img src={exercise.gifUrl} alt={exercise.name} />
                            <h3>{exercise.name}</h3>
                            <ul>
                                <li>{exercise.target}</li>
                                {exercise.secondaryMuscles.slice(0, 2).map((muscle, idx) => (
                                    <li key={idx}>{muscle}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No exercises found for {id}.</p>
            )}
        </div>
    );
};

export default BodyPartsCategory;
