import { useImage } from "../hooks/use-image"

export default function Gallery() {

    // const { images } = useImage()

    return (
        <>
            <div className="relative w-full h-full flex flex-grow mt-20 p-10 box-border overflow-auto">
                <div className="w-full columns-4 gap-x-10 overflow-auto">
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1512646605205-78422b7c7896?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnxuc0pEY25ZMkhwa3x8ZW58MHx8fHx8" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3xuc0pEY25ZMkhwa3x8ZW58MHx8fHx8" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1512646605205-78422b7c7896?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnxuc0pEY25ZMkhwa3x8ZW58MHx8fHx8" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1642969424975-4eb74b144117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8bnNKRGNuWTJIcGt8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1642969424975-4eb74b144117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8bnNKRGNuWTJIcGt8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8bnNKRGNuWTJIcGt8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1512646605205-78422b7c7896?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnxuc0pEY25ZMkhwa3x8ZW58MHx8fHx8" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3xuc0pEY25ZMkhwa3x8ZW58MHx8fHx8" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1512646605205-78422b7c7896?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnxuc0pEY25ZMkhwa3x8ZW58MHx8fHx8" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1642969424975-4eb74b144117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8bnNKRGNuWTJIcGt8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1642969424975-4eb74b144117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8bnNKRGNuWTJIcGt8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8bnNKRGNuWTJIcGt8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1512646605205-78422b7c7896?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnxuc0pEY25ZMkhwa3x8ZW58MHx8fHx8" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3xuc0pEY25ZMkhwa3x8ZW58MHx8fHx8" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1512646605205-78422b7c7896?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnxuc0pEY25ZMkhwa3x8ZW58MHx8fHx8" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1642969424975-4eb74b144117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8bnNKRGNuWTJIcGt8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1642969424975-4eb74b144117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8bnNKRGNuWTJIcGt8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <img className="w-full mb-3 max-w-full rounded-md break-inside-avoid" loading="lazy" src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8bnNKRGNuWTJIcGt8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
            </div>
        </>
    )
}