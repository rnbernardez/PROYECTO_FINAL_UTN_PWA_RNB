import Product, { PRODUCT_PROPS } from "../models/productModel.js"
import { ServerError } from "../utils/error.utils.js";
import { getAllProducts, getProductById, createProduct } from "../repository/shopRepository.js";

const shopController = async (req, res) => {
    try {
        const products = await getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        throw new ServerError(error.message, 500);
    }
};

const productController = async (req, res) => {
    try {
        const { _id } = req.params; // Obtener el id del producto desde los parámetros de la URL
        const product = await getProductById(_id); // Buscar el producto en la base de datos

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

const addProductController = async (req, res) => {
    try {
        // Desestructuramos los datos del body
        const { name, category, sub_category, price, description, stock, images } = req.body;

        // Validación básica: Verificar campos obligatorios
        if (!name || !category || !sub_category || !price || !description || !stock) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Validar que la categoría sea válida
        if (!['De Rio', 'De Mar'].includes(category)) {
            return res.status(400).json({ error: 'Categoría inválida' });
        }

        // Validar la subcategoría de acuerdo a la categoría seleccionada
        const validSubCategories = category === 'De Rio' 
            ? ['Trucha', 'Bagre', 'Carpa', 'Dorado', 'Surubi', 'Boga', 'Pacú', 'Pejerrey', 'Otro']
            : ['Atún', 'Merluza', 'Salmón', 'Lenguado', 'Corvina', 'Pez Espada', 'Bonito', 'Otro'];

        if (!validSubCategories.includes(sub_category)) {
            return res.status(400).json({ error: `Subcategoría inválida para la categoría ${category}` });
        }

        // Preparar los datos del producto usando las constantes del modelo
        const productData = {
            [PRODUCT_PROPS.NAME]: name,
            [PRODUCT_PROPS.CATEGORY]: category,
            [PRODUCT_PROPS.SUB_CATEGORY]: sub_category,
            [PRODUCT_PROPS.PRICE]: price,
            [PRODUCT_PROPS.DESCRIPTION]: description,
            [PRODUCT_PROPS.STOCK]: stock,
            [PRODUCT_PROPS.IMAGES]: images || []
        };

        // Crear el producto utilizando el repositorio
        const newProduct = await createProduct(productData);

        // Responder con el producto recién creado
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al agregar producto:", error);
        return res.status(500).json({ error: 'Error al agregar el producto' });
    }
};

export { shopController, productController, addProductController }