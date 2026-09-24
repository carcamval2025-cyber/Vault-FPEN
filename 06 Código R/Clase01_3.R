# instalación de paquetes
install.packages("readr")
install.packages("tidyverse")

# Cargando paquetes
library(tidyverse)

# Iniciando con los gráficos
ggplot(data = penguins, 
        mapping = aes(
          x=flipper_len,
          y=body_mass,
          color = species,
          shape = species)) +
       geom_point() +
  geom_smooth(method = "lm", se = FALSE, color = "black") +
  labs(
    title = "Pinguinote",
    subtitle = "alotas y peso",
    x = "largo",
    y = "peso",
    color = "Especie",
    shape = "Especies"
  )
