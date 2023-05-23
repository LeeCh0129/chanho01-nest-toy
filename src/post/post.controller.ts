import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { CreatePostDto } from './create-post.dto';
import { User } from 'src/user/user.entity';
import { RequestWithUser } from 'src/auth/auth.interface';
import { UpdatePostDto } from './update-post.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { Posts } from './post.entity';

@Controller('post')
// @UseGuards(AuthGuard())
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<Posts> {
    return this.postService.createPost(createPostDto, user);
  }

  @Get()
  getAllPosts(@Req() req: RequestWithUser) {
    return this.postService.getAllPosts(req.user);
  }

  @Get(':id')
  getPostById(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }

  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: RequestWithUser,
  ) {
    const user: User = req.user;
    return this.postService.updatePost(id, updatePostDto, user);
  }
}
