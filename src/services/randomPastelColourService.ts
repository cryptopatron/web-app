export const randomPastelColourService = () => {
    const randomHue = Math.random()
    const randomSaturation = Math.random()
    const randomLightness = Math.random()

    return (["hsl(" + 360 * randomHue + ',' +
             (40 + 55 * randomSaturation) + '%,' + 
             (80 + 10 * randomLightness) + '%)', "hsl(" + 360 * randomHue + ',' +
             (20 + 35 * randomSaturation) + '%,' + 
             (40 + 10 * randomLightness) + '%)'  ])
    
}
