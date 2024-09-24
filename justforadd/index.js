import { getFirestore, collection, addDoc, query, getDocs, where } from "firebase/firestore"; 
import { db } from "../src/firebase";


const addDummyCategories = async () => {
    const categories = [
        { name: "Electronics", description: "Devices and gadgets including phones, laptops, and accessories." },
        { name: "Clothing", description: "Men’s and Women’s apparel including shirts, pants, dresses, and accessories." },
        { name: "Home Appliances", description: "Kitchen and household items such as refrigerators, microwaves, and vacuum cleaners." },
        { name: "Books", description: "A wide variety of books including fiction, non-fiction, and educational materials." },
        { name: "Sports Equipment", description: "Gear and accessories for various sports like football, basketball, tennis, and fitness." },
        { name: "Beauty Products", description: "Skincare, makeup, and hair care products from various brands." },
        { name: "Toys & Games", description: "Fun and educational toys for kids, including board games and outdoor play equipment." },
        { name: "Jewelry", description: "Fashion and fine jewelry including necklaces, bracelets, and earrings." },
        { name: "Health & Personal Care", description: "Health supplements, personal hygiene items, and wellness products." },
        { name: "Automotive Accessories", description: "Car accessories, tools, and parts for vehicle maintenance and enhancement." },
        { name: "Furniture", description: "Home and office furniture including chairs, tables, and storage solutions." },
        { name: "Garden & Outdoor", description: "Outdoor furniture, gardening tools, and decor items for patio and garden." },
        { name: "Pet Supplies", description: "Food, toys, and accessories for pets including dogs, cats, and birds." },
        { name: "Office Supplies", description: "Stationery, printer supplies, and organizational tools for the office." },
        { name: "Fashion Accessories", description: "Bags, belts, hats, and other accessories to complement outfits." },
    ];


    async function addCategory(category) {
        try {
            // Step 1: Check if the category already exists
            const q = query(collection(db, "categories"), where("name", "==", category.name));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                console.log("Category already exists!");
                return;  // Don't add if it already exists
            }
    
            // Step 2: If category does not exist, add it
            await addDoc(collection(db, "categories"), category);
            console.log("Category added successfully!");
    
        } catch (error) {
            console.error("Error adding category: ", error);
        }
    }


    try {
        for (const category of categories) {
            await addCategory(category)
            console.log(`Category ${category.name} added successfully.`);
        }
    } catch (error) {
        console.error("Error adding categories: ", error);
    }
};

// Call the function
 addDummyCategories();
