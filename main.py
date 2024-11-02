"""
Sistema experto
"""
import interfaz.menu as menu
from acciones import engine


def main():
    #engine.base.from_json("medios_cultivo.json")  # Por defecto
    #engine.base.from_json("Problema_de_Coneccion.json")
    engine.base.from_json("Cultivos_de_plantas.json")
    

    app = menu.Interfaz()
    app.mainloop()


if __name__ == '__main__':
    main()
