import matlab.engine
import numpy as np

engine = matlab.engine.start_matlab()

def convert_csv_to_image(input):
  engine.plot(np.array(input))
  engine.exportgraphics(engine.gcf(), "file.png", nargout=0)

convert_csv_to_image([1,2,3])