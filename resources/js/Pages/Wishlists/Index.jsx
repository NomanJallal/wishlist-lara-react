import { useState } from 'react';
import { Inertia } from '@inertiajs/react';

export default function Index({ wishlists }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/wishlists', { name, description });
    };

    const handleDelete = (id) => {
        Inertia.delete(`/wishlists/${id}`);
    };

    return (
        <div>
            <h1>Wishlists</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                 <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <button type="submit">Add</button>
            </form>

            <ul>
                {wishlists.map((wishlist) => (
                    <li key={wishlist.id}>
                        {wishlist.name} - {wishlist.description}
                        <button onClick={() => handleDelete(wishlist.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
