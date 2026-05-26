import { useNavigate } from "react";
import { Button, ImageGrid } from "@/components";
import { ImageOverlay } from "@/components/controls/images/ImageOverlay";
import type { ImageCell } from "@/core/types/types";
import { favouriteAction } from "@/core/utils/ImageActions";
export const SettingsView = () => {
  return <section>
      const navigate = useNavigate(); 
    if (user) {
      <div className="flex items-center gap-5">
        <img alt="profile" className="rounded-full w-20 h-20" src={user.imageUrl ?? "https://via.placeholder.com/150"} />
        <div>
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
      </div>
    }
   <section className="flex flex-col items-center gap-5 py-10">
    <p className="text-gray-400">You are not logged in.</p>
    <Button onClick={() => navigate("/")} variant="primary">
      Go to Home
    </Button>
}
  </section>;
};
