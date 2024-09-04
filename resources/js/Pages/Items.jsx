import WishlistItems from '@/Components/WishlistItems';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router,Head,usePage } from '@inertiajs/react';


function Items({ auth, items ,wishlists}) {

    const {flash} = usePage().props
    const { errors } = usePage().props

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Items</h2>}
        >
            <Head title="Items" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {flash.message && (
                                <div className='py-2 px-4 rounded-md bg-green-300 text-center mb-6'>
                                    {flash.message}
                                </div>
                            )}

                    <div className="flex flex-wrap justify-center gap-4 p-4">
                                {items.map(item => (
                                    <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                        <WishlistItems
                                            item={item}
                                            wishlists={wishlists}
                                            can_add={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Items;
