export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-300 to-purple-300">
      
      {/* Avatar */}
      <div className="text-8xl mb-8">{"💪🏻🏀✌🏻"}</div>
            
      {/* ชื่อ */}
      <h1 className="text-7xl font-bold text-green-900 mb-6">
        รัฐภูมิ กันภัย 💪🏻🫵🏻
      </h1>
      
      {/* Tagline */}
      <p className="text-3xl font-bold text-green-800 mb-8">
        อยากประมูลสินค้า อยากเป็นเจ้าอสังหาริมทรัพย์
      </p>
      
      {/* 2 ปุ่ม */}
      <div className="flex gap-4">
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                กดซิครับ
        </button>
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                ไม่ให้กดครับ
        </button>
      </div>
      
    </main>
  );
}