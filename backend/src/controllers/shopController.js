import Product, { PRODUCT_PROPS } from "../models/productModel.js"
import { ServerError } from "../utils/error.utils.js";
import { getLatestProducts, getProductById, createProduct } from "../repository/shopRepository.js";

const shopController = async (req, res) => {
    try {
      const products = await getLatestProducts(); // Usamos la nueva función
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return res.status(500).json({ error: "Error al obtener los productos" });
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
        const { userId } = req.user;
        
        const categories = {
            'De Rio': ['Trucha', 'Bagre', 'Carpa', 'Dorado', 'Surubi', 'Boga', 'Pacú', 'Pejerrey', 'Otro'],
            'De Mar': ['Atún', 'Merluza', 'Salmón', 'Lenguado', 'Corvina', 'Pez Espada', 'Bonito', 'Otro']
        };

        // Validación básica: Verificar campos obligatorios
        if (!name || !category || !sub_category || !price || !description || !stock) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Validar que la categoría sea válida
        if (!categories[category]) {
            return res.status(400).json({ error: 'Categoría inválida' });
        }

        // Validar la subcategoría de acuerdo a la categoría seleccionada
        if (!categories[category].includes(sub_category)) {
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
            [PRODUCT_PROPS.IMAGES]: images || [],
            createdBy: userId
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
const updateProductController = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name, category, sub_category, price, description, stock, images } = req.body;

        // Validar que el producto existe
        const product = await Product.findById(_id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Actualizar los campos del producto
        product.name = name || product.name;
        product.category = category || product.category;
        product.sub_category = sub_category || product.sub_category;
        product.price = price || product.price;
        product.description = description || product.description;
        product.stock = stock || product.stock;
        product.images = images || product.images;

        await product.save(); // Guardamos el producto actualizado

        return res.status(200).json(product); // Respondemos con el producto actualizado
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        return res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// **Nuevo** Controlador para eliminar un producto
const deleteProductController = async (req, res) => {
    try {
        const { _id } = req.params;
        const { userId } = req.user; // Asumiendo que el middleware de autenticación establece req.user

        // Validar que el producto existe
        const product = await Product.findById(_id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Verificar si el usuario autenticado es el creador del producto
        if (product.createdBy.toString() !== userId) {
            return res.status(403).json({ error: 'No tienes permiso para eliminar este producto' });
        }

        // Eliminar el producto
        await product.remove();

        return res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

export { shopController, productController, addProductController, updateProductController, deleteProductController };