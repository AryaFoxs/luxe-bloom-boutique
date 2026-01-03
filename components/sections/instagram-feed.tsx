import Link from "next/link";
import Image from "next/image";
import { Instagram, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder Instagram posts data
const instagramPosts = [
  { id: 1, likes: 234, image: "/images/instagram/post-1.jpg" },
  { id: 2, likes: 189, image: "/images/instagram/post-2.jpg" },
  { id: 3, likes: 312, image: "/images/instagram/post-3.jpg" },
  { id: 4, likes: 156, image: "/images/instagram/post-4.jpg" },
  { id: 5, likes: 278, image: "/images/instagram/post-5.jpg" },
  { id: 6, likes: 421, image: "/images/instagram/post-6.jpg" },
];

function InstagramCard({ post }: { post: typeof instagramPosts[0] }) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-2xl bg-muted cursor-pointer">
      {/* Image placeholder with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose via-rose-light to-gold">
        <div className="absolute inset-0 flex items-center justify-center">
          <Instagram className="w-10 h-10 text-white/30" />
        </div>
      </div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-burgundy/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <Heart className="w-5 h-5 fill-current" />
          <span className="font-semibold">{post.likes}</span>
        </div>
      </div>
    </div>
  );
}

export function InstagramFeed() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-rose text-sm font-medium uppercase tracking-widest mb-4">
            @luxebloomboutique
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Follow Our{" "}
            <span className="text-rose">Flower Story</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Get inspired by our latest creations and behind-the-scenes moments. 
            Join our floral community on Instagram.
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <InstagramCard key={post.id} post={post} />
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-2 border-rose text-rose hover:bg-rose hover:text-white transition-all duration-300 group"
          >
            <Link 
              href="https://instagram.com/luxe.bloomboutique" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow Us on Instagram
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
