function Avatar({ name }: { name: string }) {
  // Extract the first character from the name
  const firstCharacter = name.charAt(0).toUpperCase()

  // Use the first character to generate a background color
  //   const backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16)

  return (
    <div
      className="w-9 h-9 flex items-center justify-center text-white text-sm bg-[#FF7121]"
      //   style={{ backgroundColor }}
    >
      {firstCharacter}
    </div>
  )
}

export default Avatar
