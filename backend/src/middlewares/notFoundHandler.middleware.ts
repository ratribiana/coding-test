import { AsyncHandler } from '@interfaces/asyncHandler.interface';

import { asyncHandler } from '@utils/functions';

const notFoundHandler: AsyncHandler = asyncHandler(async (req, res) => {
  if (req.headers.accept?.includes('html')) {
    // If request is from a browser
    res.status(404).send(`
      <div>
        <span>Page not found.</span>
      </div>
    `);
  } else {
    // If request is via CURL, AJAX, Postman, etc
    res.status(404).json({
      success: false,
      message: 'API not found',
    });
  }
});

export default notFoundHandler;
