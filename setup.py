#!/usr/bin/env python
# -*- coding: iso-8859-1 -*-                                        #
#####################################################################
#                                                                   #
# Frets on Fire X                                                   #
# Copyright (C) 2009-2010 FoFiX Team                                #
#               2006 Sami Kyöstilä                                  #
#                                                                   #
# This program is free software; you can redistribute it and/or     #
# modify it under the terms of the GNU General Public License       #
# as published by the Free Software Foundation; either version 2    #
# of the License, or (at your option) any later version.            #
#                                                                   #
# This program is distributed in the hope that it will be useful,   #
# but WITHOUT ANY WARRANTY; without even the implied warranty of    #
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the     #
# GNU General Public License for more details.                      #
#                                                                   #
# You should have received a copy of the GNU General Public License #
# along with this program; if not, write to the Free Software       #
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,        #
# MA  02110-1301, USA.                                              #
#####################################################################

import sys, glob, os
from FoFiX import SceneFactory, Version

try:
    from setuptools import setup, find_packages, Extension
except ImportError:
    from ez_setup import use_setuptools
    use_setuptools()
    from setuptools import setup, find_packages, Extension

install_requires = [
    'pygame == 1.9.1release',
    'Cython == 0.12.1',
    'PIL == 1.1.7',
    'PyOpenGL == 3.0.1',
    'numpy == 1.4.1',
]

extras_require = {
    #todo: 'pyogg':  ["pyogg>=1.3"],
    #fixme 'pyvorbis':  ["pyvorbis>=1.4"],
}

#I'm too lazy to do it right
try:
  import shutil
  src_dir = os.path.abspath('./')
  dest_dir = os.path.join(os.environ.pop('VIRTUAL_ENV'), 'share/fofix/')
  shutil.copytree(src_dir, dest_dir)
except OSError:
  pass

setup_args = {}

# Try to register Cython for building our extensions.
try:
  import numpy
  from Cython.Distutils import build_ext
  setup_args['cmdclass'] = {'build_ext': build_ext}
except ImportError:
  pass

# Add the common arguments to setup().
# This includes arguments to cause FoFiX's extension modules to be built.
setup_args.update({
  'name': 'FoFiX',
  'version': 'grisly-py26env',
  'zip_safe' : False,
  'packages': ['FoFiX', 'FoFiX.midi'],
  #'data_files': get_data_files(),
  'scripts': ['scripts/FoFiX'],
  'ext_package': 'FoFiX',
  'ext_modules': [
    Extension('cmgl', ['FoFiX/cmgl.pyx'], include_dirs=[numpy.get_include()], libraries=['opengl32' if os.name == 'nt' else 'GL']),
  ]
})

# And finally...
setup(**setup_args)
