"""
Sistema experto
"""
import interfaz.menu as menu
from acciones import engine


def main():
    engine.base.from_json("example.json")  # Por defecto
    app = menu.Interfaz()
    app.mainloop()


if __name__ == '__main__':
    main()
