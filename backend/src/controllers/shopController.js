import Product, { PRODUCT_PROPS } from "../models/productModel.js"
import { ServerError } from "../utils/error.utils.js";

const shopController = async (req, res) => {
    try {
        const products = await Product.find();  // Encuentra todos los productos
        return res.status(200).json(products);  // Devuelve los productos en formato JSON
    } catch (error) {
        throw new ServerError(error.message, 500);  // Si hay un error, responde con un mensaje
    }
};

const productController = async (req, res) => {
    try {
        const { _id } = req.params; // Obtener el id del producto desde los parámetros de la URL

        // Buscar el producto en la base de datos por su ID
        const product = await Product.findById(_id);

        // Si no se encuentra el producto, devolver un error
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Si se encuentra el producto, devolverlo en la respuesta
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el producto' });
    }
}

const addProductController = async (req, res) => {
    try {
        // Desestructuramos los datos necesarios del cuerpo de la solicitud
        const { 
            name, 
            category, 
            sub_category, 
            price, 
            description, 
            stock, 
            images 
        } = req.body;

        // Validación básica para asegurarse de que los campos necesarios estén presentes
        if (!name || !category || !sub_category || !price || !description || !stock) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Validar categoría
        if (!['De Rio', 'De Mar'].includes(category)) {
            return res.status(400).json({ error: 'Categoría inválida' });
        }

        // Validar subcategoría en función de la categoría seleccionada
        const validSubCategories = category === 'De Rio' 
            ? ['Trucha', 'Bagre', 'Carpa', 'Dorado', 'Surubi', 'Boga', 'Pacú', 'Pejerrey', 'Otro']
            : ['Atún', 'Merluza', 'Salmón', 'Lenguado', 'Corvina', 'Pez Espada', 'Bonito', 'Otro'];

        if (!validSubCategories.includes(sub_category)) {
            return res.status(400).json({ error: `Subcategoría inválida para la categoría ${category}` });
        }

        // Creamos el nuevo producto usando el modelo Product
        const newProduct = new Product({
            [PRODUCT_PROPS.NAME]: name,
            [PRODUCT_PROPS.CATEGORY]: category,
            [PRODUCT_PROPS.SUB_CATEGORY]: sub_category,
            [PRODUCT_PROPS.PRICE]: price,
            [PRODUCT_PROPS.DESCRIPTION]: description,
            [PRODUCT_PROPS.STOCK]: stock,
            [PRODUCT_PROPS.IMAGES]: images || [], // Puede ser un array vacío si no se pasan imágenes
        });

        // Guardamos el nuevo producto en la base de datos
        await newProduct.save();

        // Respondemos con el producto recién creado
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al agregar el producto' });
    }
};

export { shopController, productController, addProductController }