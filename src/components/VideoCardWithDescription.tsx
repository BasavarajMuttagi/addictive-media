const VideoCardWithDescription = () => {
  return (
    <div className="flex items-center space-x-4 p-1">
      <img
        src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="thumbnail"
        className="aspect-video h-[100px] rounded-md"
      />

      <div className="space-y-2 text-white/60">
        <div className="font-medium">How to get Rich</div>
        <div className="text-white/40 text-sm font-normal">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
          officiis aliquid impedit. Asperiores voluptatibus impedit quisquam.
          Voluptatum maiores blanditiis quidem sequi reiciendis quibusdam, culpa
          delectus assumenda, neque consectetur commodi modi ab quas magni, esse
          iste quis dolore. Odit nam nesciunt amet ipsa illum error, deleniti
          consequuntur commodi! Laudantium, dolor fuga?
        </div>
      </div>
    </div>
  );
};

export default VideoCardWithDescription;
