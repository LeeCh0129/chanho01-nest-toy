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
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/entities/user.entity';
import { RequestWithUser } from 'src/auth/auth.interface';
import { UpdatePostDto } from './dtos/update-post.dto';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('post')
// @UseGuards(AuthGuard())
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    console.log(user);
    return this.postService.createPost(
      user,
      createPostDto.title,
      createPostDto.content,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('my-posts')
  @UseGuards(AuthGuard('jwt'))
  getMyPosts(@GetUser() user: User) {
    return this.postService.getMyPosts(user);
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
