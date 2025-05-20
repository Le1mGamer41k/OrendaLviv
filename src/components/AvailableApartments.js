import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ApartmentsReviews from "./ApartmentsReviews";


const AvailableApartments = () => {
    useEffect(() => {
        const apartments = document.querySelectorAll('.apartment-card');
        apartments.forEach((apt, i) => {
            apt.style.backgroundColor = i % 2 === 0 ? '#e0ffe0' : '#ffe0e0';
            const title = apt.querySelector('h2');
            title.textContent = `Квартира ${i + 1}: ${title.textContent}`;
        });

        const mapContainer = document.getElementById('map');
        if (mapContainer && !mapContainer._leaflet_id) {
            const map = L.map('map').setView([49.8397, 24.0297], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(map);

            const customIcon = L.icon({
                iconUrl: '/icons/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            const markers = [
                { coords: [49.8327, 24.0132], popup: 'Квартира 1: 2-кімнатна, $1,000, вул. Генерала Чупринки, 17' },
                { coords: [49.789, 24.0187], popup: 'Квартира 2: 3-кімнатна, $1,700, вул. Стрийська, 85' },
                { coords: [49.8410, 24.0267], popup: 'Квартира 3: 1-кімнатна, $700, просп. Свободи, 10' },
            ];

            markers.forEach(({ coords, popup }) => {
                L.marker(coords, { icon: customIcon }).addTo(map).bindPopup(popup);
            });
        }
    }, []);

    return (
        <div>
            <h1>Список доступних квартир</h1>
            <div className="apartment-grid">
                {[{
                    img: "https://rembud.com.ua/wp-content/uploads/qwr_19226.jpeg",
                    title: "2-кімнатна квартира", price: "$1,000", size: "60 м²", link: "2rooms"
                }, {
                    img: "https://studio-mint.pro/sites/default/files/sites/default/files/imce/21_1.jpg",
                    title: "3-кімнатна квартира", price: "$1,700", size: "85 м²", link: "3rooms"
                }, {
                    img: "https://0ba.ru/images/2021/01/06/petroglif-park1-0.jpg",
                    title: "1-кімнатна квартира", price: "$700", size: "40 м²", link: "1room"
                }].map((apt, i) => (
                    <div className="apartment-card" key={i}>
                        <img src={apt.img} alt={apt.title} />
                        <h2>{apt.title}</h2>
                        <p>Ціна: {apt.price}</p>
                        <p>Площа: {apt.size}</p>
                        <div className="button-container">
                            <Link to={`/booking?apartment=${apt.link}`} className="a2">Забронювати</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div id="map" style={{ height: '400px', margin: '40px auto', maxWidth: '900px' }}></div>
            <ApartmentsReviews apartmentId="2rooms" />

        </div>
    );
};

export default AvailableApartments;

