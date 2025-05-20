import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const ApartmentReviews = ({ apartmentId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [text, setText] = useState('');

    const fetchReviews = async () => {
        try {
            if (!user) return;
            const snapshot = await getDocs(collection(db, 'reviews'));
            const data = snapshot.docs
                .map(doc => doc.data())
                .filter(r => r.apartmentId === apartmentId);
            setReviews(data);
        } catch (error) {
            console.error("Помилка при завантаженні відгуків:", error.message);
        }
    };

    const submitReview = async () => {
        try {
            if (!text.trim() || !user) return;
            await addDoc(collection(db, 'reviews'), {
                Review: text,
                Gmail: user.email,
                apartmentId,
                createdAt: new Date().toISOString()
            });
            setText('');
            fetchReviews();
        } catch (error) {
            alert("Помилка додавання відгуку: " + error.message);
        }
    };

    useEffect(() => {
        if (user) fetchReviews();
    }, [user]);

    return (
        <div style={{ marginTop: '40px' }}>
            <h2>Відгуки користувачів</h2>
            {user ? (
                <>
                    {reviews.map((r, i) => (
                        <div key={i} style={{ margin: '10px 0', borderBottom: '1px solid #ccc' }}>
                            <p><strong>{r.Gmail}</strong>: {r.Review}</p>
                        </div>
                    ))}

                    <textarea
                        placeholder="Ваш відгук..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                        rows="4"
                        style={{ width: '100%', padding: '10px' }}
                    />
                    <button onClick={submitReview} style={{ marginTop: '10px' }}>Залишити відгук</button>
                </>
            ) : (
                <p>🔐 Увійдіть, щоб переглянути або залишити відгук</p>
            )}
        </div>
    );
};

export default ApartmentReviews;
