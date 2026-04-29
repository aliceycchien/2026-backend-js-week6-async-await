// ========================================
// 第六週作業：電商 API 資料串接練習
// 執行方式：node homework.js
// 環境需求：Node.js 18+（內建 fetch）
// ========================================

// 載入環境變數
require("dotenv").config({ path: ".env" });

// API 設定（從 .env 讀取）
const API_PATH = process.env.API_PATH;
const BASE_URL = "https://livejs-api.hexschool.io";
const ADMIN_TOKEN = process.env.API_KEY;

// ========================================
// 任務一：基礎 fetch 練習
// ========================================

/**
 * 1. 取得產品列表
 * 使用 fetch 發送 GET 請求
 * @returns {Promise<Array>} - 回傳 products 陣列
 */
async function getProducts() {
	// 請實作此函式
	const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`;
    const response = await fetch(url);
    const { products } = await response.json();
    return products;
}

/**
 * 2. 取得購物車列表
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function getCart() {
	// 請實作此函式
	const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    const response = await fetch(url);
    return await response.json();
}

/**
 * 3. 錯誤處理：當 API 回傳錯誤時，回傳錯誤訊息
 * @returns {Promise<Object>} - 回傳 { success: boolean, data?: [...], error?: string }
 */
async function getProductsSafe() {
	// 請實作此函式
	try {
        const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`HTTP 狀態異常: ${response.status}`);
        
        const { products: data } = await response.json();
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ========================================
// 任務二：POST 請求 - 購物車操作
// ========================================

/**
 * 1. 加入商品到購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳更新後的購物車資料
 */
async function addToCart(productId, quantity) {
	// 請實作此函式
	const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { productId, quantity } }) 
    });
    return await response.json();
}

/**
 * 2. 編輯購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳更新後的購物車資料
 */
async function updateCartItem(cartId, quantity) {
	// 請實作此函式
	const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { id: cartId, quantity } })
    });
    return await response.json();
}

/**
 * 3. 刪除購物車特定商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳更新後的購物車資料
 */
async function removeCartItem(cartId) {
	// 請實作此函式
	const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`;
    const response = await fetch(url, { method: "DELETE" });
    return await response.json();
}

/**
 * 4. 清空購物車
 * @returns {Promise<Object>} - 回傳清空後的購物車資料
 */
async function clearCart() {
	// 請實作此函式
	const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    const response = await fetch(url, { method: "DELETE" });
    return await response.json();
}

// ========================================
// HTTP 知識測驗 (額外練習)
// ========================================

/*
請回答以下問題（可以寫在這裡或另外繳交）：

1. HTTP 狀態碼的分類（1xx, 2xx, 3xx, 4xx, 5xx 各代表什麼）
   答：
   - 1xx (Informational)：資訊回應，請求已接收，繼續處理。
   - 2xx (Success)：成功，請求已成功被伺服器接收、理解並接受。
   - 3xx (Redirection)：重新定向，需要客戶端採取進一步操作以完成請求。
   - 4xx (Client Error)：用戶端錯誤，請求包含錯誤語法或無法完成請求。
   - 5xx (Server Error)：伺服器錯誤，伺服器在處理請求時發生錯誤。

2. GET、POST、PATCH、PUT、DELETE 的差異
   答：
   - GET：取得資料。
   - POST：新增資料。
   - PUT：替換資料（整份更新）。
   - PATCH：修改部分資料（局部更新）。
   - DELETE：刪除資料。

3. 什麼是 RESTful API？
   答：RESTful API 是一種基於 REST 架構風格的網路 API 設計標準。它強調資源（Resources）的概念，透過統一的介面（如標準的 HTTP 方法）與直觀的路徑設計（URL）來對資源進行操作，提升系統的可讀性、擴展性與無狀態性。
*/

// ========================================
// 匯出函式供測試使用
// ========================================
module.exports = {
	API_PATH,
	BASE_URL,
	ADMIN_TOKEN,
	getProducts,
	getCart,
	getProductsSafe,
	addToCart,
	updateCartItem,
	removeCartItem,
	clearCart,
};

// ========================================
// 直接執行測試
// ========================================
if (require.main === module) {
	async function runTests() {
		console.log("=== 第六週作業測試 ===\n");
		console.log("API_PATH:", API_PATH);
		console.log("");

		if (!API_PATH) {
			console.log("請先在 .env 檔案中設定 API_PATH！");
			return;
		}

		// 任務一測試
		console.log("--- 任務一：基礎 fetch ---");
		try {
			const products = await getProducts();
			console.log(
				"getProducts:",
				products ? `成功取得 ${products.length} 筆產品` : "回傳 undefined",
			);
		} catch (error) {
			console.log("getProducts 錯誤:", error.message);
		}

		try {
			const cart = await getCart();
			console.log(
				"getCart:",
				cart ? `購物車有 ${cart.carts?.length || 0} 筆商品` : "回傳 undefined",
			);
		} catch (error) {
			console.log("getCart 錯誤:", error.message);
		}

		try {
			const result = await getProductsSafe();
			console.log(
				"getProductsSafe:",
				result?.success ? "成功" : result?.error || "回傳 undefined",
			);
		} catch (error) {
			console.log("getProductsSafe 錯誤:", error.message);
		}

		console.log("\n=== 測試結束 ===");
		console.log("\n提示：執行 node test.js 進行完整驗證");
	}

	runTests();
}
