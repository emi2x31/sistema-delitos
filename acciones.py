"""
Interfaz de consola y funciones de manejo de la base de conocimientos
"""
from experto_general.engine import Engine

# Motor como variable global
engine = Engine()

# Carga la base de conocimientos desde "delitos.json" al iniciar
try:
    engine.base.from_json("delitos.json")
    print("Base de conocimientos 'delitos.json' cargada exitosamente.")
except Exception as e:
    print(f"Error al cargar la base de conocimientos: {e}")

def insertar(nombre, prop):
    if nombre and prop:
        entry = engine.base.get_or_add_entry(nombre)
        entry.get_or_add_prop(prop)
        print(f"Entrada agregada: {entry}")
    else:
        print("No se admiten valores vacíos")

def get_base_entries():
    return engine.base.entries

def guardar(entrada):
    """
    Guarda la base de conocimientos en un archivo JSON especificado
    """
    if entrada:
        engine.base.to_json(entrada.strip())
        print("El archivo fue guardado con éxito")
    else:
        print("Elige un nombre para el archivo")

def cargar(entrada):
    """
    Carga la base de conocimientos desde un archivo JSON especificado
    """
    if entrada:
        try:
            engine.base.from_json(entrada.strip())
            print("El archivo fue cargado con éxito")
        except KeyError:
            print("Archivo inválido o con formato incorrecto")
    else:
        print("Elige un nombre del archivo a cargar")
